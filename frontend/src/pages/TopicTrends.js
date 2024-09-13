import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WordCloud from 'react-wordcloud';
import { useNavigate } from 'react-router-dom';
import './TopicTrends.css';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const TopicTrends = () => {
    const [trendData, setTrendData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [result, setResult] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function getTopicTrends() {
            try {
                const response = await axios.get('/service/topictrends');
                setTrendData(response.data.topic_trends);
                setLoading(false);
            }
            catch (error) {
                console.error('에러 발생', error);
            }
        }
        getTopicTrends();
    }, []);

    const handleClick = (date) => {
        setSelectedDate(date);
        const result = trendData.find(entry => entry.date === date);
        setResult(result);
        console.log(result);
    };

    return (
        <div className='topic-trend-page'>
            {loading && <div>로딩 중...</div>}
            <div className='topic-trend-content-container'>
                <div className='topic-trend-content-container-left'>
                    <div className='topic-trend-rank-container'>
                        <p1>2024.09.10</p1>
                        <div className='topic-trend-rank-wrapper-container'>
                            <div className='topic-trend-rank-wrapper'>
                                <p2>1. </p2>
                                <p2>2. </p2>
                                <p2>3. </p2>
                                <p2>4. </p2>
                                <p2>5. </p2>
                            </div>
                            <div className='topic-trend-rank-wrapper'>
                                <p2>6. </p2>
                                <p2>7. </p2>
                                <p2>8. </p2>
                                <p2>9. </p2>
                                <p2>10. </p2>
                            </div>
                        </div>
                    </div>
                    <div className='topic-trend-rank-text-cloud-container'>
                        {trendData.map((data, index) => (
                            <button key={index} onClick={() => handleClick(data.date)}>
                                {data.date}
                            </button>
                        ))}
                        {selectedDate && result && (
                            <div>
                                <h2>{selectedDate}</h2>
                                {result.words.map((keyword, index) => (
                                    <p key={index}>
                                        {index + 1}. {keyword.topic}
                                    </p>
                                ))}
                                <div style={{ width: '1000px', height: '500px' }}>
                                <WordCloud words={result.words.map(word => ({ text: word.topic, value: word.frequency}))}></WordCloud>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='topic-trend-content-container-right'>
                    <div className='topic-trend-rank-detail-container'>
                        <p1>트렌드 A</p1>
                        <div className='topic-trend-rank-detail-article'>
                            <p2>1. </p2>
                            <p2>2. </p2>
                            <p2>3. </p2>
                            <p2>4. </p2>
                            <p2>5. </p2>
                            <p2>6. </p2>
                            <p2>7. </p2>
                            <p2>8. </p2>
                            <p2>9. </p2>
                            <p2>10. </p2>
                        </div>
                        <br1/>
                        <div className='topic-trend-rank-detail-post'>
                            <p2>1. </p2>
                            <p2>2. </p2>
                            <p2>3. </p2>
                            <p2>4. </p2>
                            <p2>5. </p2>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TopicTrends;    