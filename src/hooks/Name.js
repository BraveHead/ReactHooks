
import  { useEffect, useState } from 'react';


const useName = (props) => {

    const [name, setName] = useState(null);

    console.log('useEffect before:', name);


    useEffect(() => {
        setName(props.name);
        console.log('useEffect setting:', name, props.name);
    }, []);


    console.log('useEffect after:', name);

    return name;
}

export default useName;