import React from 'react';
import {expect} from 'chai';
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon';
import {shallow, mount} from 'enzyme';
import jsdom from 'jsdom';
import Toolbar from '../components/common/Toolbar';
import ToolbarItem from '../components/common/ToolbarItem';
import BasicListItem from '../components/common/BasicListItem';
import DropdownButton from '../components/common/DropdownButton';
import Navbar from '../components/common/Navbar';
import Modal from '../components/common/Modal';
import SearchBox from '../components/common/SearchBox';
import UserAvatar from '../components/common/UserAvatar';
import SelectableListItem from '../components/common/SelectableListItem';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;
chai.use(chaiEnzyme());

describe('<ToolbarItem/>', () => {
  it('should handle click event', () => {
    const action = {id: 'add', icon: 'add'};
    const handleClick = sinon.spy();
    const wrapper = shallow(<ToolbarItem action={action} onClick={handleClick}/>);
    const button = wrapper.find('button');

    button.simulate('click', {preventDefault: () => {}});
    expect(handleClick.calledOnce).to.equal(true);
    expect(wrapper.state('active')).to.be.true;

    button.simulate('click');
    expect(wrapper.state('active')).to.be.false;
  });
});

describe('<Toolbar/>', () => {
  const actions = [
    {id: 'add', icon: 'add'},
    {id: 'remove', icon: 'remove'},
  ];
  const handleClick = sinon.spy();
  const wrapper = mount(<Toolbar items={actions} onClick={handleClick}/>);

  it('should have ToolbarItem', () => {
    expect(wrapper.find(ToolbarItem)).to.have.length(2);
  });

  it('should have action prop', () => {
    expect(wrapper.find(ToolbarItem).at(1).prop('action')).to.equal(actions[1]);
  });

  it('should handle click event', () => {
    wrapper.find(ToolbarItem).at(0).find('button').simulate('click');
    expect(handleClick.calledWith(actions[0]));
  });
});

describe('<BasicListItem/>', () => {
  const items = {
    leftItem: 'Left',
    bodyItem: 'Body',
    rightItem: 'Right',
  };
  const handleClick = sinon.spy();
  const wrapper = mount(<BasicListItem {...items} onClick={handleClick}/>);

  it('should render', () => {
    expect(wrapper.find('.media-left').text()).to.equal('Left');
    expect(wrapper.find('.media-body').text()).to.equal('Body');
    expect(wrapper.find('.media-right').text()).to.equal('Right');
  });

  it('should handle click event', () => {
    wrapper.simulate('click');
    expect(handleClick.calledOnce).to.be.true;
  });
});

describe('<DropdownButton/>', () => {
  const items = [
    {action: 'add', text: 'Add'},
    {action: 'delete', text: 'Delete'},
  ];
  const handleDropdownClick = sinon.spy();
  const wrapper = mount(<DropdownButton icon="ellipsis-v" dropdown={items} onClick={handleDropdownClick}/>);
  const button = wrapper.find('button');

  it('should render dropdown button', () => {
    expect(wrapper.find('.fa-ellipsis-v')).to.have.length(1);
  });

  it('should render dropdown menu', () => {
    expect(wrapper.find('.dropdown-menu')).to.have.length(1);
  });

  it('should handle dropdown click event', () => {
    wrapper.find('li').at(0).simulate('click');
    expect(handleDropdownClick.calledWith('add'));
  });

  it('should show dropdown menu on button click', () => {
    button.simulate('click');
    expect(wrapper.state('dropdownOpen')).to.be.true;
    expect(wrapper.find('.dropdown-menu')).to.have.style('display', 'block');
  });

  it('should hide dropdown menu on mouseout', () => {
    wrapper.simulate('mouseleave');
    expect(wrapper.find('.dropdown-menu')).to.have.style('display', 'none');
  });
});

describe('<Navbar/>', () => {
  const actions = [
    {id: 'call', icon: 'call'},
    {id: 'info', icon: 'info'},
  ];
  const handleBack = sinon.spy();
  const handleAction = sinon.spy();
  const wrapper = mount(<Navbar title="Title" subtitle="Subtitle" actions={actions} 
                                onBack={handleBack} onAction={handleAction}/>);

  it('should render title & subtitle', () => {
    expect(wrapper.find('.title-wrapper h4').text()).to.equal('Title');
    expect(wrapper.find('.title-wrapper span').text()).to.equal('Subtitle');
  });

  it('should render action buttons', () => {
    expect(wrapper.find('.actions-wrapper .btn.call')).to.have.length(1);
    expect(wrapper.find('.actions-wrapper .btn.info')).to.have.length(1);
  });

  it('should handle onBack event', () => {
    wrapper.find('.title-wrapper').simulate('click');
    expect(handleBack.calledOnce).to.be.true;
  });

  it('should handle onAction event', () => {
    wrapper.find('.actions-wrapper .btn.call').simulate('click');
    expect(handleAction.calledWith(actions[0])).to.be.true;
  });
});

describe('<Modal/>', () => {
  const buttons = [
    {action: 'cancel', text: 'Cancel', type: 'default'},
    {action: 'delete', text: 'Delete', type: 'danger'},
  ];
  const handleButtonClick = sinon.spy();
  const wrapper = mount(<Modal buttons={buttons} title="Delete message" size="sm"
                               onClick={handleButtonClick}/>);

  it('should render title', () => {
    expect(wrapper.find('.modal-title').text()).to.equal('Delete message');
  });

  it('should render buttons', () => {
    expect(wrapper.find('.modal-footer .btn')).to.have.length(2);
  });

  it('should render small size', () => {
    expect(wrapper.find('.modal-sm')).to.have.length(1);
  });

  it('should handle button click event', () => {
    wrapper.find('.modal-footer .btn-danger').simulate('click');
    expect(handleButtonClick.calledWith('delete')).to.be.true;
  });
});

describe('<Searchbox/>', () => {
  const handleTextChange = sinon.spy();
  const handleDismiss = sinon.spy();
  const wrapper = mount(<SearchBox placeholder="Search friend..." 
                                   onTextChange={handleTextChange}
                                   onDismiss={handleDismiss}/>);

  const input = wrapper.find('input[type="text"]');

  it('should have placeholder', () => {
    expect(input.props().placeholder).to.equal('Search friend...');
  });

  it('should handle text change event', () => {
    input.simulate('change', {target: {value: 'Frank'}});
    expect(handleTextChange.calledWith('Frank')).to.be.true;
  });

  it('should dismiss on blur', () => {
    input.simulate('blur');
    expect(handleDismiss.calledOnce).to.be.true;
  });
});

describe('<UserAvatar/>', () => {
  const user = {
    nick: 'nick_1',
    first_name: 'Albert',
    last_name: 'Hill',
    avatar: '1.jpg',
    online: true,
    last_online: 1403191091333,
    online_from: [
      'mobile',
      'web',
    ]
  };
  const wrapper = mount(<UserAvatar size="small" user={user}/>);

  it('should have size class', () => {
    expect(wrapper.find('.avatar.size-small')).to.have.length(1);
  });

  it('should have an avatar image', () => {
    const img = wrapper.find('img');
    expect(img).to.have.length(1);
    expect(img.props().src).to.equal('/public/images/avatar/1.jpg');
  });
});

describe('<SelectableListItem/>', () => {
  const data = {
    nick: 'nick_1',
    name: 'Benjamin',
  };
  const handleClick = sinon.spy();
  const wrapper = mount(<SelectableListItem onClick={handleClick} data={data}/>);

  it('should render checkbox', () => {
    expect(wrapper.find('input[type="checkbox"]')).to.have.length(1);
  });

  it('should be selectable', () => {
    wrapper.setState({selected: true});
    expect(wrapper.find('input[type="checkbox"]')).to.be.checked;
    wrapper.setState({selected: false});
    expect(wrapper.find('input[type="checkbox"]')).not.to.be.checked;
  });

  it('should handle click event', () => {
    wrapper.simulate('click');
    expect(wrapper.state('selected')).to.be.true;
    expect(handleClick.calledWith(true, data));
  });
});
