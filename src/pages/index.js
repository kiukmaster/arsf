import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((jsonData) => setData(jsonData));
    }, []);

    if (!data) {
        return <div>데이터 불러오는 중...</div>
    }

    const clickModal = (char) => {
        setModalData(char);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    };

    const filterData = data.filter((char) => char.name.includes(searchInput.trim()))

    return (
        <>
            <div className="searcharea">
                <input
                    className='searchbar'
                    type='text'
                    placeholder='검색'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    />
            </div>
            <div className="container">
                {filterData.map((char) => (
                    <div key={char.id}>
                        <img src={`./character2/${char.id}.png`} alt={char.name} /><br />
                        <button className="openbutton" onClick={() => clickModal(char)}>{char.name}</button>
                    </div>
                ))}
                {/* 모달창 */}
                {showModal && (
                    <div className="SearchModalBox" onClick={closeModal}>
                        <div className="SearchModalContent" onClick={(e) => e.stopPropagation()}>
                            <button className="closeBtn" onClick={closeModal}>X</button>
                            <h2>{modalData.name}</h2>
                            <h4><span style={{ color: 'blueviolet' }}>출현작</span> : <span className='fw-bold'>{modalData.ani}</span></h4>
                            <h4>Tag : <span className='color-tag'>{modalData.tag}</span></h4>
                            <h4><span style={{ color: 'red' }}>HP</span> : <span style={{ color: 'gray' }}>{modalData.hp}</span></h4>
                            <hr />
                            <p><span className='fw-bold color-passive'>Passive</span> : <span className='fw-bold'>{modalData.passive.name}</span><br />
                            설명 : {modalData.passive.des}<br /><br />
                            <span className='fw-bold color-skill'>Skill 1</span> : <span className='fw-bold'>{modalData.skill1.name}</span><br />
                            {modalData.skill1.des}<br /><br />
                            <span className='fw-bold color-skill'>Skill 2</span> : <span className='fw-bold'>{modalData.skill2.name}</span><br />
                            {modalData.skill2.des}<br /><br />
                            <span className='fw-bold color-skill'>Skill 3</span> : <span className='fw-bold'>{modalData.skill3.name}</span><br />
                            {modalData.skill3.des}<br /><br />
                            <span className='fw-bold color-skill'>Skill 4</span> : <span className='fw-bold'>{modalData.skill4.name}</span><br />
                            {modalData.skill4.des}<br /><br />
                            <span className='fw-bold color-skill'>Skill 5</span> : <span className='fw-bold'>{modalData.skill5.name}</span><br />
                            {modalData.skill5.des}<br /><br />
                            <span className='fw-bold color-special1'>S</span><span className='fw-bold color-special2'>p</span><span className='fw-bold color-special3'>e</span><span className='fw-bold color-special4'>c</span><span className='fw-bold color-special5'>i</span><span className='fw-bold color-special6'>a</span><span className='fw-bold color-special7'>l</span> : <span className='fw-bold'>{modalData.special.name}</span><br />
                            <span className='color-condition'>조건</span> : <span className='fw-bold'>{modalData.special.condition}</span><br />
                            {modalData.special.des}<br />
                            </p>
                            <h3 style={{ color: 'yellowgreen' }}>===== 평 가 =====</h3>
                            재미 : <span style={{ color: 'rgb(218, 218, 0)' }}>{modalData.eval.fun}</span><br />
                            성능 : <span style={{ color: 'rgb(218, 218, 0)' }}>{modalData.eval.performance}</span><br />
                            난이도 : <span style={{ color: 'rgb(218, 218, 0)' }}>{modalData.eval.level}</span><br />
                            <span>{modalData.eval.levelsanz}</span><br />
                            평가 : {modalData.eval.text}<br />
                            <h3 style={{ color: 'blue' }}>===== 공 략 =====</h3>
                            <p>{modalData.attack}</p>
                            <h3 style={{ color: 'crimson' }}>===== 상대법 =====</h3>
                            <p>{modalData.solution}</p>
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
            .container {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                text-align: center;
            }
            img {
                width: 150px;
                height: 150px;
            }
            .openbutton {
                width: 150px;
                height: 30px;
                border-radius: 20px;
                border-color: #6100FF;
                transition: transform 0.2s ease-in-out;
                font-weight: bold;
                margin-bottom: 1.3rem;
            }
            .openbutton:hover {
                cursor: pointer;
                transform: scale(1.05) translateY(-2px);
                background: white;
            }
            .SearchModalBox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .SearchModalContent {
                overflow: auto;
                max-height: 80%;
                padding: 3rem 2rem;
                width: 30rem;
                border-radius: 0.3rem;
                display: flex;
                flex-direction: column;
                background-color: #ffffff;
            }
            .closeBtn {
                position: absolute;
                top: 10px;
                right: 10px;
                text-align: center;
                width: 30px;
                height: 30px;
            }
            .searchbar {
                width: 300px;
                height: 35px;
                padding-left: 15px;
                border-radius: 20px;
                border-color: #6100FF;
            }
            .searchbar:focus {
                outline: none;
                border-color: #6100FF;
            }
            .searcharea {
                text-align: center;
                margin: 2rem;
            }
            `}</style>
        </>
    );
}