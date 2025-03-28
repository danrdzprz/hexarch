import type { ResponseSuccess } from "~/data/modules/shared/domain/ResponseSuccess";
import { useFeedbackStore } from "~/data/store/feedback.store";

export const HandleSuccessResponse = (response: any, ): string =>{
    const feedback = useFeedbackStore();
    const message = (response as  ResponseSuccess).message
    feedback.openSuccess({message:`${message}`});
    return message;
}