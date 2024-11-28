import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type PostCardProps = {
    title: string;
    content: string;
    id: string;
    onDeleteClick: (id: string) => void;
}

export const PostCard = ({ title, content, onDeleteClick, id }: PostCardProps) => {
    return (
        <Card className="h-[293px] mb-7 drop-shadow overflow-y-clip">
            <CardHeader className="flex-row justify-between gap-4">
                <CardTitle className="leading-6 flex-1 text-lg font-medium">{title}</CardTitle>
                <Button 
                    className="!-mt-6 text-red-400 hover:text-red-600" 
                    onClick={() => onDeleteClick(id)} size="icon" variant="ghost"
                >
                    <Trash />
                </Button>
            </CardHeader>
            <CardContent className="text-sm leading-5">
                <p className="line-clamp-[7]">{content}</p>
            </CardContent>
        </Card>
    )
}