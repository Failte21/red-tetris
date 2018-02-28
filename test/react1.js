import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import {createRenderer} from 'react-addons-test-utils'
import GameRoom from "../src/client/containers/GameRoom";
import App from "../src/client/containers/App";

chai.should()
chai.use(equalJSX)

describe('Fake react test', function(){
  it('works', function(){
    const renderer = createRenderer()
    renderer.render(React.createElement(App))
    const output = renderer.getRenderOutput()
    output.should.equalJSX(<GameRoom />)
  })

})
