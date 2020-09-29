import {useEffect, useState} from "react"

function HttpMethod (method, url, body) {
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
        const fetchData = () => {
            setIsError(false)
            setIsLoading(true)

            try {
                fetch(baseUrl, options)
                    .then(res => res.json())
                    .then(res => {
                            setData(res.data)
                            setIsLoading(false)
                        }
                    )

            } catch (error) {
                setIsError(true)
            }
        }
        fetchData()
    }, [baseUrl, options])

    return ({isLoading, isError, data})
}

export default HttpMethod