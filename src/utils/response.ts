interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export const formatResponse = <T>(data?: T, error?: string): ApiResponse<T> => {
  return {
    success: !error,
    data,
    error,
    timestamp: new Date(),
  };
};
