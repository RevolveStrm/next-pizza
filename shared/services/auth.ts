import { APIRoutes } from './constants';
import { UserInfoDTO } from './dto/auth.dto';
import { http } from './http-instance';

export const getUserInformation = async () => {
    return (await http.get<UserInfoDTO>(APIRoutes.GET_USER_INFORMATION)).data;
};
