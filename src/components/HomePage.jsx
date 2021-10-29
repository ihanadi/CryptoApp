import React from 'react';
import millify from 'millify';
import {Typography, Row, Col, Statistic} from 'antd';
import {Link} from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography;

function HomePage() {
  const { data, isFetching } = useGetCryptosQuery();
  const globalStats = data?.data?.stats;

  if(isFetching) return 'Loading...'

  return (
    <div>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span="12" className=""> 
          <Statistic title="Total Cryptocurrensies" value={globalStats.total}/> 
        </Col>
        <Col span="12" className=""> 
          <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/> 
        </Col>
        <Col span="12" className=""> 
          <Statistic title="Total Market Cup" value={millify(globalStats.totalMarketCap)}/> 
        </Col>
        <Col span="12" className=""> 
          <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/> 
        </Col>
        <Col span="12" className=""> 
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/> 
        </Col>
      </Row>
    </div>
  )
}

export default HomePage
