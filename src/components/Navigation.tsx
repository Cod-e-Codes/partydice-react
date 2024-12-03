import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Navigation = () => {
  return (
    <nav className="fixed top-4 right-4 z-50 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:items-center">
      <Link to="/store" className="w-full sm:w-auto">
        <Button variant="outline" className="gap-2 w-full sm:w-auto">
          <Store className="h-4 w-4" />
          Store
        </Button>
      </Link>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            How to Play
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-bold">Game Rules:</h4>
            <ol className="list-decimal list-inside space-y-1">
              <li>Add at least 2 players to start</li>
              <li>Take turns rolling the dice</li>
              <li>Complete challenges to earn points</li>
              <li>The player with most points wins!</li>
            </ol>
          </div>
        </HoverCardContent>
      </HoverCard>
    </nav>
  );
};

export default Navigation;
