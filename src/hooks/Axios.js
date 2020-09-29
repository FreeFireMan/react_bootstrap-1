import {useEffect, useState} from "react"
import axios from "axios"

const HttpMethod = (method, url, body) => {
    const [baseMethod, setBaseMethod] = useState('GET')
    const [baseUrl, setBaseUrl] = useState('http://127.0.0.1:8000')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState([])

    const options = {
        method: baseMethod,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    setBaseMethod(method)
    setBaseUrl(baseUrl + url)
    options.body = JSON.stringify(body)


    useEffect(() => {
        axios(baseUrl, options)
            .then(res => {
                setData(res.data)
                setIsLoading(true)
            })
            .catch(err => {
                setIsError(err.message);
                setIsLoading(false)
            })
    }, [baseUrl, options])

    return ({isLoading, isError, data})
}

export default HttpMethod