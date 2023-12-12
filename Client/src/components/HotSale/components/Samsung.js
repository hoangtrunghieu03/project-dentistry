import React, { useEffect, useState } from 'react';
import axios from 'axios'
import ListProduct from '../ListProduct'

import {handlePercentDiscount} from '../../../untils/index'
// import { useDispatch} from 'react-redux';


function Samsung(props) {
    // const dispatch = useDispatch()
    const [hotSamsung, setHotSamsung] = useState([])

    useEffect(() => {
        async function FetchApi(){
            try {
                const {data} = await axios.get(`http://localhost:4000/products/samsung`)
                setHotSamsung(data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section id="hotsale">
            <div className="hotsale">
                <h2>samsung</h2>
                {
                    hotSamsung ? (<ListProduct HotSaleProducts={handlePercentDiscount(hotSamsung)}></ListProduct>) : ''
                }
            </div>
        </section>

    );
}


export default Samsung;