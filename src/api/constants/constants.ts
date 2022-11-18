import { environment } from "src/environments/environment";

export class Constants {
    public static DEFAULT_PAGE_NUMBER = 0;  
    public static DEFAULT_PAGE_SIZE = 6;
    public static DEFAULT_PAGE_SORT_BY = "id";
    public static DEFAULT_PAGE_ORDER = "asc";
    
    public static UPLOAD_PATH = environment.API_BASE_URL.replace("/api","/upload/");
}