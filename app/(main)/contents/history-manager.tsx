import { fetchFromGateway, patchToGateway, postToGateway } from "../api-operations";
import { API_GATEWAY_URL } from "../constants/consts";
import { HistoryElement } from "../models/types";

/**
 * @summary It decides if a history element has to be created or if it has to be updated if the user has watched that content before
 * @param contentType - The type of the content can either be movie or episode
 * @param contentId - The specific id of the history element to retreive from the backend
 * @returns 
 */
export async function updateHistory(contentType: string, contentId: number): Promise<HistoryElement>{
    try {
        const element = await fetchFromGateway<HistoryElement>(`${API_GATEWAY_URL}/history/user/personal/${contentType}/${contentId}`);
        element.watchDate = new Date();
        await patchToGateway(`${API_GATEWAY_URL}/history/${element.id}`, element);
        return element;
    } catch {
        const historyElement: HistoryElement = {
            id: 0,
            movieId: null,
            episodeId: null,
            watchDate: new Date(),
            progress: 0,
        }
        if (contentType === 'movie') {
            historyElement.movieId = contentId;
        } else if (contentType === 'episode') {
            historyElement.episodeId = contentId;
        }
        await postToGateway(`${API_GATEWAY_URL}/history/new`, historyElement);
        return historyElement;
    } 
}
