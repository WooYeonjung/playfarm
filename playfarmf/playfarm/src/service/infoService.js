import axios from "axios";
import { API_BASE_URL } from "./app-config";

const InfoService = {
    fetchInfoData: async (infoDv) => {
        try {
            const data = JSON.parse(localStorage.getItem("infoDataJSON"));
            if (data) {
                return data.filter((item) => item.infoType === infoDv);
            } else {
                throw new Error("로컬 스토리지에서 데이터를 가져오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    // getInfoDataPage: async (page, size, infoDv) => {
    //     try {
    //         const data = JSON.parse(localStorage.getItem("infoDataJSON"));
    //         if (data) {
    //             const infoList = data.filter((item) => item.infoType === infoDv);
    //             const totalCnt = infoList.length;
    //             const pageOffset = page * size;
    //             const contents = infoList.slice(pageOffset, pageOffset + size);
    //             const isLastPage = page >= Math.ceil(totalCnt / size) - 1;
    //             return { contents, totalCnt, isLastPage };
    //         } else {
    //             throw new Error("로컬 스토리지에서 데이터를 가져오는 데 실패했습니다.");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         return { contents: [], totalCnt: 0, isLastPage: true };
    //     }
    // },    
    getInfoDataPage: async (page, size, infoDv) => {
        try {
            const data = await axios.get(`${API_BASE_URL}/info/infolist?dv=${infoDv}&page=${page}&size=${size}`);
            return data;
        } catch (error) {
            console.error(error);
            return { contents: [], totalCnt: 0, isLastPage: true };
        }
    },
    getCartData: async (userId) => {
        try {
            const data = JSON.parse(localStorage.getItem("cartJSON"));
            if (data) {
                return data.filter((item) => item.userid === userId);
            } else {
                throw new Error("로컬 스토리지에서 데이터를 가져오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    getPayData: async (userId) => {
        try {
            const data = JSON.parse(localStorage.getItem("pay"));
            if (data) {
                return data.filter((item) => item.userid === userId);
            } else {
                throw new Error("로컬 스토리지에서 데이터를 가져오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    },
};

export default InfoService;
