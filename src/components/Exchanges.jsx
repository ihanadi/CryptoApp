import React from 'react';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { Row, Col, Collapse, Avatar, Typography } from 'antd';

import { useGetCryptoExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

function Exchanges() {
  const { data, isFetching } = useGetCryptoExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if(isFetching) return <Loader />;
  
  return (
    <div>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse style={{display:"block"}}>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl}/>
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Exchanges
