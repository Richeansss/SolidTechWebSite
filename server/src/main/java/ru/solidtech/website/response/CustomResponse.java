package ru.solidtech.website.response;

public class CustomResponse<T> {
    private final Result result;
    private final T data;

    public CustomResponse(int status, String message, T data) {
        this.result = new Result(status, message);
        this.data = data;
    }

    public Result getResult() {
        return result;
    }

    public T getData() {
        return data;
    }

    public static class Result {
        private final int status;
        private final String message;

        public Result(int status, String message) {
            this.status = status;
            this.message = message;
        }

        public int getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }
    }
}