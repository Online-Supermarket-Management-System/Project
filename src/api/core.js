import axios from 'axios'

export const POST = async(endpoint, requestBody = {}, authorization = null) => {
    const instance = createInstance(authorization, 'application/json')

    const response = await instance.post(endpoint, requestBody)

    return response.data
}

export const GET = async(endpoint, authorization = null) => {
    const instance = createInstance(authorization, 'application/json')
        
    const response = await instance.get(endpoint)
    
    return response.data
}

export const MULTIPART = async(endpoint, formData = null, authorization = null) => {
    const instance = getBaseInstance()
      
    if (authorization) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${authorization}`
    }
        
    const response = await instance.post(endpoint, formData)
    
    return response.data
}

const createInstance = (authorization, contentType) => {
    const instance = getBaseInstance()
      
    if (authorization) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${authorization}`
    }

    instance.defaults.headers.post['Content-Type'] = contentType

    return instance
}

const PUT = async (endpoint, data, authorization) => {
  const instance = createInstance(authorization, 'application/json');
  const response = await instance.put(endpoint, data);
  return response.data;
};

export const DELETE = async (endpoint, data, authorization) => {
    const instance = createInstance(authorization, 'application/json');
    const response = await instance.delete(endpoint, data);
    return response.data;
  };

const getBaseInstance = () => {
    return axios.create({ baseURL: "http://localhost:4000/"})
}
export { PUT };