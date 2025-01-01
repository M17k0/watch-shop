import { useParams } from "react-router-dom";

export function WatchPage() {
  const params = useParams();
  
  const watchId = params.id;
  return (
    <div>
      <h1>Watch {watchId}</h1>
    </div>
  );
}
