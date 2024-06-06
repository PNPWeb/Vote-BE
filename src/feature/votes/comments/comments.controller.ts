import { Controller, Get, Headers, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";

@Controller("votes")
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get(":voteId/comments")
    public async getComments(@Param("voteId") voteId: number) {
        return this.commentsService.getComments(voteId);
    }

    @Post(":voteId/comments")
    public async createComment(
    @Headers("Authorization") tokenHeader: string,
        @Param("voteId") voteId: number
    ) {
        if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) throw new HttpException("Token not provided", HttpStatus.UNAUTHORIZED);

        const token = tokenHeader.replace("Bearer ", "");

        await this.commentsService.createComment();

    }
}
