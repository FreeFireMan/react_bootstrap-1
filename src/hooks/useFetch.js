import {useEffect, useState, useCallback} from "react";
import axios from "axios";


export default (url) => {
    const baseUrl = 'http://127.0.0.1:8000'
    const [isLoading, setIsLoading] =  useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})


    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
    },[])


    useEffect(() => {

        if (!isLoading) {
            return
        }

        const requestOptions = {
            ...options,
            ...{
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
        console.log('requestOptions');
        console.log(requestOptions);


        axios(baseUrl + url, requestOptions)
            .then(res => {
                console.log('success', res);
                setResponse(res.data)
                setIsLoading(false)
            })
            .catch(({response}) => {
                setIsLoading(false)
                console.log('ERROR', response);
                setError(response)
            })
    },[isLoading,url,options])

    return [{isLoading, response, error}, doFetch]
}
