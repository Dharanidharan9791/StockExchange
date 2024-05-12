import React, { useEffect, useState } from 'react';
import { ChartComponent } from './Components/Charts';
import { Button, Row, Col, Container, Form } from 'react-bootstrap';
import "./App.css"

import StocksUpIcon from "./Assets/Stocksup.png"
import StocksDownIcon from "./Assets/Stocksdown.png"
import UserIcon from "./Assets/user.png"
import Data from "./Data/data.json"


export default function App() {
    const [stockData, setStockData] = useState([]) //State to be sent to the chart
    const [currentIndex, setCurrentIndex] = useState(0); // State to keep track of the current index
    const [amount, setAmount] = useState(100) //State to keep the value of deposited amount
    const [baselineValue, setBaselineValue] = useState(20) // Chart's baseline value
    const [percentage, setPercentage] = useState(0) //State to keep percentage of gain
    const [profitAmount, setProfitAmount] = useState(0)//State to keep profit amount
    const [theme, setTheme] = useState("Success") //State to set theme if negative danger , if positive success
    const [showLogout, setShowLogout] = useState(false) // Boolean to show logout dropdown 
    const incrementAmount = () => {
        setAmount(amount + 50)
    }

    const decrementAmount = () => {
        setAmount(amount - 50)

    }
    const increaseBaseValue = () => {
        setBaselineValue(baselineValue + 5)
    }
    const decreaseBaseValue = () => {
        setBaselineValue(baselineValue - 5)

    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < Data.length) {
                // Insert the object at the current index 
                const objectToInsert = Data[currentIndex];
                setStockData([...stockData, objectToInsert])

                const profit = objectToInsert.value - Data[0].value;
                const profitPercentage = (profit / Data[0].value) * 100;
                setTheme(profitPercentage > 0 ? "Success" : "Danger")
                const profitAmount = (amount * profitPercentage) / 100;
                const totalAmount = amount + profitAmount;

                setPercentage(profitPercentage.toFixed(2))
                setProfitAmount(totalAmount.toFixed(2))
                console.log("Inserting object:", profitPercentage > 0 ? "Success" : "Danger");


                setCurrentIndex(prevIndex => prevIndex + 1); // Move to the next index
            } else {
                clearInterval(interval); // Stop the interval when all objects are inserted
            }
        }, 2000); // Interval of 2 second

        return () => clearInterval(interval); // Cleanup function to clear the interval
    }, [currentIndex, Data]);

    return (
        <Container className='wrapper' fluid>
            <Row className='gx-0 gy-0 header'>
                <Col className='d-flex align-items-center ms-4'>
                   The Wall Street Journal
                </Col>

                <Col className='d-flex justify-content-end '>
                    <div className='d-flex align-items-center pe-5 cursorPointer' onClick={() => setShowLogout(!showLogout)}>
                        <img src={UserIcon} alt="UserIcon" style={{ width: "50px", marginRight: "20px" }}></img>
                        K Dharanidharan
                    </div>

                </Col>
            </Row>
            {showLogout && <div className='logoutButton' onClick={() => setShowLogout(false)}>Logout</div>}
            {
                Object.keys(stockData).length !== 0 ?
                    <Container className='gx-0 gy-0 p-0 ' fluid>
                        <Row className='gx-0 gy-0  toatalAmountHeader' fluid>
                            <Col className='gx-0 gy-0'>
                                <div className='stockNameContainer'>
                                    <div className='ms-2 stockName'>EUR/USD</div>
                                    <div className={` ms-2 stockNamePercentage ${theme} `}>{percentage} %</div>
                                </div>
                            </Col>
                            <Col className='gx-0 gy-0 d-flex justify-content-end'>
                                <div className={` toatalPrice pe-4 ${theme} `}>
                                    $ {profitAmount}
                                </div>
                            </Col>
                        </Row>

                        <Row className=' chartWrapper gx-0 gy-0 pt-3'>
                            {/* <Col md={1} className=' gx-0 gy-0'></Col> */}
                            <Col className='ms-5 gx-0 gy-0  p-0'>
                                <div className='chartContainer'>
                                    {
                                        Object.keys(stockData).length !== 0 &&
                                        <ChartComponent data={stockData} baseLine={baselineValue} />

                                    }

                                </div>
                                <div className='comapanyName mt-3'>Stark Industries</div>
                            </Col>
                            <Col md={2} className='detailsContainer gx-0 gy-0 px-4 py-0'>
                                <Form.Group>
                                    <Form.Label>Amount:</Form.Label>
                                    <div className='d-flex amountInputContainer'>
                                        <div className='currencySymbol'>$</div>
                                        <Form.Control className='amountInput' value={amount} maxLength={8} onChange={(e) => setAmount(parseInt(e.target.value))}></Form.Control>
                                    </div>

                                    <div className='d-flex gap-2 '>
                                        <Button className='amountButtons' onClick={decrementAmount}>-</Button>
                                        <Button className='amountButtons' onClick={incrementAmount}>+</Button>
                                    </div>
                                </Form.Group>
                                <div className='mt-3'>
                                    <div>Profit:</div>
                                    <div className={`  profitPercentage ${theme} `} >{percentage} %</div>
                                    <div className={` profitAmount ${theme} `} >$ {profitAmount}</div>
                                </div>
                                <div className='buttonContainer mt-4'>
                                    <div className="higherButton cursorPointer" onClick={() => increaseBaseValue()}>
                                        <div className='d-flex justify-content-center'>
                                            <img src={StocksUpIcon} alt='StocksUpIcon' style={{ width: "28px" }}></img>
                                        </div>
                                        <div>Higher</div>
                                    </div>
                                </div>

                                <div className='buttonContainer'>
                                    <div className="lowerButton cursorPointer" onClick={() => decreaseBaseValue()}>
                                        <div className='d-flex justify-content-center'>
                                            <img src={StocksDownIcon} alt='StocksUpIcon' style={{ width: "28px" }}></img>
                                        </div>
                                        <div>Lower</div>
                                    </div>
                                </div>





                            </Col>

                        </Row>
                    </Container>
                    :
                    <div className='loading'>
                        Loading...
                    </div>
            }

        </Container>

    );
}