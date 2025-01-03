package services

import (
	"errors"
	"watch-shop-server/internal/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserService struct {
	db *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{db: db}
}

func (s *UserService) CreateUser(user *models.User) error {
	var existingUser models.User
	if err := s.db.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return errors.New("email already in use")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)
	user.Role = models.RoleUser

	if err := s.db.Create(user).Error; err != nil {
		return err
	}
	return nil
}

// GetUserByID retrieves a user by their ID.
func (s *UserService) GetUserByID(id uint) (*models.User, error) {
	user := &models.User{}
	if err := s.db.First(user, id).Error; err != nil {
		return nil, err
	}
	return user, nil
}

// AuthenticateUser checks the user's email and password for login.
func (s *UserService) AuthenticateUser(email, password string) (*models.User, error) {
	user := &models.User{}
	if err := s.db.Where("email = ?", email).First(user).Error; err != nil {
		return nil, errors.New("invalid email or password")
	}

	// Compare the provided password with the hashed password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, errors.New("invalid email or password")
	}

	return user, nil
}
