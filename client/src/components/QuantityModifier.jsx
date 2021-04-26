import React, { useState} from 'react'
import '../styles/QuantityModifier.css'

function QuantityModifier({quantityValue}) {

    const [quantity, setQuantity] = useState(1);
    
    return (
        <div className="modifier">
            <div className="modifier-wrapper">
                <button className="button" onClick={()=>{setQuantity(quantity+1);quantityValue = quantity;}} >+</button>
                <div className="quantity-display">
                    <input 
                    className="quantity-input" 
                    value={quantity} 
                    onChange={
                        (e)=>{
                            if(e.target.value === ""){
                                setQuantity(0);
                                console.log(e.target.value);
                            }
                            else {
                                setQuantity(parseInt(e.target.value));
                                console.log(e.target.value);
                            }
                            
                        }
                    }
                    />
                </div>
                <button className="button" onClick={()=>{setQuantity(quantity-1);quantityValue = quantity;}} disabled={quantity <= 1 ? "true" : false}>-</button>
            </div>  
        </div>
    )
}

export default QuantityModifier



// Matrix<float ,3,3> matran;

// float arr[3][3] = {
//     {1,2,3},
//     {4,5,6},
//     {7,8,9}
// };


// for(int i = 0;i< 3 ;i++){
//     for(int j=0;j<3;j++){
//         matran(i,j) = arr[i][j];
//     }
// }

// cout << matran << endl;