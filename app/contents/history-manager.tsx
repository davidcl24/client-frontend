import { fetchFromGateway, patchToGateway, postToGateway } from "../api-operations";
import { API_GATEWAY_URL } from "../constants/consts";
import { HistoryElement } from "../models/types";

export async function updateHistory(contentType: string, userId: number, contentId: number): Promise<HistoryElement>{
    try {
        const element = await fetchFromGateway<HistoryElement>(`${API_GATEWAY_URL}/history/user/${userId}/${contentType}/${contentId}`);
        element.watchDate = new Date();
        await patchToGateway(`${API_GATEWAY_URL}/history/${element.id}`, element);
        return element;
    } catch {
        const historyElement: HistoryElement = {
            id: 0,
            userId: 1,
            movieId: null,
            episodeId: null,
            watchDate: new Date(),
            progress: 0,
        }
        if (contentType === 'movie') {
            historyElement.movieId = contentId;
        } else if (contentType === 'show') {
            historyElement.episodeId = contentId;
        }
        await postToGateway(`${API_GATEWAY_URL}/history`, historyElement);
        return historyElement;
    } 
}
