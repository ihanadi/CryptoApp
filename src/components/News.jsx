import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery} from "../services/cryptoNewsApi";
import { useGetCryptosQuery} from "../services/cryptoApi";
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const demoImage = "https://websitebuilderbg.eu/wp-content/uploads/2018/03/BITCOIN-MINING.png";

const News = ({ simplified }) => {
  const [ newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({newsCategory, count: simplified ? 3 : 100});
  const { data } = useGetCryptosQuery(100);
  if(!cryptoNews?.value) return <Loader />;

  return (
    <div>
      <Row gutters={[ 24, 24 ]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLocaleLowerCase())}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins?.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
            </Select>
          </Col>
        )}
        {cryptoNews.value.map((news, i)=>(
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable  className="news-card" >
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>{news.name}</Title>
                  <img src={news?.image?.thumbnail?.contentUrl || demoImage } style={{height: '100px', width: '100px'}}   alt="news" />
                </div>
                <p>
                  {news.description > 100 
                    ? `${news.description.subString(0, 100)}...`
                    :  news.description
                  }
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="provider news" />
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(news.dataPublisher).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default News
