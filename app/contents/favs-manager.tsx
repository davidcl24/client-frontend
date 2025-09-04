import { postToGateway } from "../api-operations";
import { API_GATEWAY_URL } from "../constants/consts";
import { FavouriteElement } from "../models/types";

export async function createFavourite(contentType: string, fav: FavouriteElement) {
    await postToGateway(`${API_GATEWAY_URL}/favourites`, fav);
}