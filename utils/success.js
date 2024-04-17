export const CreateSucess = (statusCode, successMessage, data)=>{
    const successObj = {
        status: statusCode,
        message: successMessage,
        data: data
    }
    return successObj;
}