import React, {Component} from 'react';
import _ from 'lodash';
import BarChart from '../../common/BarChart';
import SimpleDataBinding from '../../common/SimpleDataBinding';
import RoundSlider from '../../common/RoundSlider';
import './HomePage.scss';

export default class HomePage extends Component {

  state = {
    barChartData: {
      labels: ['A', 'B', 'C', 'D', 'E'],
      dataset: {
        backgroundColor: '#546E7A',
        data: [10, 50, 150, 20, 30]
      }
    }
  };

  componentDidMount() {
    if (true) {
      this.updateInterval = setInterval(() => {
        this.setState(() => {
          let dataLength = _.random(3, 6);
          let data = _.times(dataLength, () => _.random(15, 655));
          let firstCharCode = 'A'.charCodeAt();
          let labels = _.times(dataLength, (index) => String.fromCharCode(firstCharCode + index));

          return {
            barChartData: {
              labels,
              dataset: {
                backgroundColor: '#546E7A',
                data
              }
            }
          };
        })
      }, 3000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    const {barChartData} = this.state;

    return (
      <div className="home-page">
        <div className="demo-panel">
          <BarChart width={300} height={500} data={barChartData}/>
        </div>
        <div className="demo-panel">
          <SimpleDataBinding/>
        </div>
        <div className="demo-panel">
          <RoundSlider/>
        </div>
      </div>
    );
  }
}
