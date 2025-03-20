

export const errorHandler = (error: any) => {
    if (error instanceof Error) {
         throw new Error(`An error occurred: ${error.message}`); ;
    } else {
        console.log(error);
        return error;
    }
}