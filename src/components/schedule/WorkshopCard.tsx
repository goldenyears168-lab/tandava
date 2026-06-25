import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, MapPin, Users, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorkshopCardProps {
  id: string;
  title: string;
  description: string;
  teacher: {
    name: string;
    avatar?: string;
  };
  startTime: string;
  duration: number;
  location: string;
  price: number;
  spotsLeft: number;
  capacity: number;
  isSeries?: boolean;
  seriesParts?: number;
  tags?: string[];
  onBook: (id: string) => void;
}

export function WorkshopCard({
  id,
  title,
  description,
  teacher,
  startTime,
  duration,
  location,
  price,
  spotsLeft,
  capacity,
  isSeries,
  seriesParts,
  tags,
  onBook,
}: WorkshopCardProps) {
  const isFull = spotsLeft === 0;

  return (
    <div className="group rounded-2xl border border-border bg-card overflow-hidden shadow-card transition-all duration-200 hover:shadow-card-hover hover:scale-[1.01]">
      {/* Top gradient banner */}
      <div className="h-2 gradient-primary" />

      <div className="p-5">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="workshop">工作坊</Badge>
          {isSeries && (
            <Badge variant="peach">{seriesParts} 堂系列</Badge>
          )}
          {tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title and description */}
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>

        {/* Teacher */}
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={teacher.avatar} alt={teacher.name} />
            <AvatarFallback className="text-xs bg-accent-lilac text-foreground">
              {teacher.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{teacher.name}</span>
        </div>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{startTime}</span>
            <span className="text-muted-foreground/50">•</span>
            <span>{duration} 分鐘</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        {/* Footer - price, spots, CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            {/* Price */}
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold">${price}</span>
            </div>
            {/* Spots */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className={cn(
                "font-medium",
                isFull ? "text-destructive" : spotsLeft <= 3 ? "text-warning" : ""
              )}>
                {isFull ? "已額滿" : `剩 ${spotsLeft} 名額`}
              </span>
            </div>
          </div>

          <Button
            variant={isFull ? "secondary" : "default"}
            onClick={() => onBook(id)}
          >
            {isFull ? "加入候補" : "預約工作坊"}
          </Button>
        </div>
      </div>
    </div>
  );
}
