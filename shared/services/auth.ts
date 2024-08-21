import { APIRoutes } from "./constants";
import { http } from "./http-instance";
import { UserInfoDTO } from "./dto/auth.dto";

export const getUserInformation = async () => {
    return (await http.get<UserInfoDTO>(APIRoutes.GET_USER_INFORMATION)).data;
};