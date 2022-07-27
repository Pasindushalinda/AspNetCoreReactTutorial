const baseUrl = "https://localhost:7187";
const productionUrl = "https://aspnetserver20220727073840.azurewebsites.net"

const endPoints = {
    getAllPosts: "getAllPosts",
    getPostById: "getPostById",
    createPost: "createPost",
    updatePost: "updatePost",
    deletePost: "deletePost"
}

const development = {
    apiGetAllPosts: `${baseUrl}/${endPoints.getAllPosts}`,
    apiGetPostById: `${baseUrl}/${endPoints.getPostById}`,
    apiCreatePost: `${baseUrl}/${endPoints.createPost}`,
    apiUpdatePost: `${baseUrl}/${endPoints.updatePost}`,
    apiDeletePost: `${baseUrl}/${endPoints.deletePost}`,
}

const production = {
    apiGetAllPosts: `${productionUrl}/${endPoints.getAllPosts}`,
    apiGetPostById: `${productionUrl}/${endPoints.getPostById}`,
    apiCreatePost: `${productionUrl}/${endPoints.createPost}`,
    apiUpdatePost: `${productionUrl}/${endPoints.updatePost}`,
    apiDeletePost: `${productionUrl}/${endPoints.deletePost}`,
}

const constant = process.env.MODE_ENV === 'development' ? development : production;

export default constant;
