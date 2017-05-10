import React, {Component} from 'react';
import './HomePage.scss';
import FirstBarChart from '../../common/FirstBarChart';
import SimpleDataBinding from '../../common/SimpleDataBinding';
import RoundSlider from '../../common/RoundSlider';

export default class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <div className="demo-panel">
          <FirstBarChart/>
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
