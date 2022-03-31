const API_KEY = "lUecCUnaKvevKkTACEevpg";

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (e) {
    throw {
      message: e.message,
      status: e.status,
    };
  }
};

export const api = {
  fetchStationDetails: async (stationName) => {
    try {
      const data = await request(
        `https://api.odsay.com/v1/api/searchStation?apiKey=${API_KEY}&lang=0&stationName=${stationName}&CID=1000&stationClass=2`
      );
      return {
        isError: false,
        data,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
  fetchRouteSearchResult: async (SID, EID) => {
    try {
      const data = await request(
        `https://api.odsay.com/v1/api/subwayPath?apiKey=${API_KEY}&lang=0&CID=1000&SID=${SID}&EID=${EID}&Sopt=1`
      );
      return {
        isError: false,
        data,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
};
