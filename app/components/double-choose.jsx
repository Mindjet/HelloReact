import '../css/double-choose.css';
import React from "react";

const data = {
    all_colors: ['卡其'],
    all_sizes: ['160'],
    detail: [
        {
            color: '卡其',
            sizes: ['160', '170']
        },
        {
            color: '深蓝',
            sizes: ['160', '170', '175', '180', '190']
        },
        {
            color: '军绿',
            sizes: ['175', '180']
        }
    ]
};

const STATE_NORMAL = 'state-normal',
    STATE_DISABLED = 'state-disabled',
    STATE_CHOSEN = 'state-chosen';

export default class DoubleChoose extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colorIndex: -1,
            sizeIndex: -1
        }
    }

    onColorClick(item, index) {
        this.isColorClickable(index) &&
        this.setState({
            colorIndex: index === this.state.colorIndex ? -1 : index
        });
    }

    onSizeClick(item, index) {
        this.isSizeClickable(item) &&
        this.setState({
            sizeIndex: index === this.state.sizeIndex ? -1 : index
        })
    }

    //颜色item根据 colorIndex和 sizeIndex 变化时会自动调用的函数
    onColorResponseChoice(index, color) {

        //如果此时颜色和尺寸都还没有选中
        if (this.state.colorIndex === -1 && this.state.sizeIndex === -1) return STATE_NORMAL;

        //如果此时仅有颜色选中
        if (this.state.colorIndex !== -1 && this.state.sizeIndex === -1) {
            return color === data.all_colors[this.state.colorIndex] ? STATE_CHOSEN : STATE_NORMAL;
        }

        //如果此时仅有尺寸选中
        if (this.state.colorIndex === -1 && this.state.sizeIndex !== -1) {
            const targetSize = data.all_sizes[this.state.sizeIndex];
            return data.detail[index].sizes.indexOf(targetSize) === -1 ? STATE_DISABLED : STATE_NORMAL;
        }

        //如果此时颜色和尺寸均有选中
        if (this.state.colorIndex !== -1 && this.state.sizeIndex !== -1) {
            const targetSize = data.all_sizes[this.state.sizeIndex];
            return data.detail[index].sizes.indexOf(targetSize) === -1 ? STATE_DISABLED : (color === data.all_colors[this.state.colorIndex] ? STATE_CHOSEN : STATE_NORMAL);
        }
    }

    //尺寸item根据 colorIndex和 sizeIndex 变化时会自动调用的函数
    onSizeResponseChoice(index, size) {

        //如果此时颜色和尺寸都还没有选中
        if (this.state.colorIndex === -1 && this.state.sizeIndex === -1) return STATE_NORMAL;

        //如果此时仅有颜色选中
        if (this.state.colorIndex !== -1 && this.state.sizeIndex === -1) {
            const targetSizes = data.detail[this.state.colorIndex].sizes;
            return targetSizes.indexOf(size) === -1 ? STATE_DISABLED : STATE_NORMAL;
        }

        //如果此时仅有尺寸选中
        if (this.state.colorIndex === -1 && this.state.sizeIndex !== -1) {
            return size === data.all_sizes[this.state.sizeIndex] ? STATE_CHOSEN : STATE_NORMAL;
        }

        //如果此时颜色和尺寸均有选中
        if (this.state.colorIndex !== -1 && this.state.sizeIndex !== -1) {
            const targetSizes = data.detail[this.state.colorIndex].sizes;
            return targetSizes.indexOf(size) === -1 ? STATE_DISABLED : (size === data.all_sizes[this.state.sizeIndex] ? STATE_CHOSEN : STATE_NORMAL);
        }
    }

    //判断颜色是否可以点击
    isColorClickable(index) {
        if (this.state.sizeIndex === -1) return true;
        const targetSize = data.all_sizes[this.state.sizeIndex];
        return data.detail[index].sizes.indexOf(targetSize) !== -1;
    }

    //判断尺寸是否可以点击
    isSizeClickable(item) {
        if (this.state.colorIndex === -1) return true;      //如果此时未选中任何颜色，则所有尺寸都可以点击
        const targetSizes = data.detail[this.state.colorIndex].sizes;
        return targetSizes.indexOf(item) !== -1;
    }

    printInfo() {
        console.log('color index: ' + this.state.colorIndex + ', color:' + data.all_colors[this.state.colorIndex]);
        console.log('size index: ' + this.state.sizeIndex + ', size:' + data.all_sizes[this.state.sizeIndex]);
    }

    componentDidMount() {

        /**--------------beginning of new code-----------------**/

        /*这里是新添加的代码哦，一些命名可能你那边已经改过了有点不一样，要看清楚然后对号入座
         * color应该是对应你的option1，size应该是对应你的option2*/

        /*
         * 首先，在第一次渲染之后（也就是在我们这个函数中），我们判断all_colors是不是只有一个元素，如果是，那么将colorIndex设为0，否则设为-1
         * 然后，在setState完成后，我们有一个回调函数，这个回调函数是拿来更新sizeIndex的
         * 怎么个更新法呢？我们判断此时all_sizes是不是也是只有一个元素，如果是，那么分为下面2种情况：
         *      1. 此时colorIndex = 0，说明all_colors只有一个元素，并且这个元素已经被选中了，此时如果该color没有包含我们这个唯一的size，那么什么事都不要干
         *      2. 如果colorIndex！= 0，或者colorIndex=0但是该color有包含我们这个唯一的size，那么我们使用setState把sizeIndex设为0，也就是把它选中
         */
        this.setState({colorIndex: data.all_colors.length === 1 ? 0 : -1},
            () => {
                if (data.all_sizes.length === 1) {
                    if (this.state.colorIndex === 0 && data.detail[0].sizes.indexOf(data.all_sizes[0]) === -1) return;
                    this.setState({sizeIndex: 0},
                        () => {
                            //在这里找出item_id并发送给服务器
                        });
                }
            });

        /**--------------end of new code-----------------**/
    }

    render() {
        return (
            <div>
                <p className="title">颜色</p>
                {
                    data.all_colors.map((item, index) => {
                        return (
                            <p className={`item ${this.onColorResponseChoice(index, item)}`} key={index}
                               onClick={e => this.onColorClick(item, index)}>{item}</p>)
                    })
                }
                <p className="title">尺码</p>
                {
                    data.all_sizes.map((item, index) => {
                        return (
                            <p className={`item ${this.onSizeResponseChoice(index, item)}`} key={index}
                               onClick={e => this.onSizeClick(item, index)}> {item}</p>)
                    })
                }
                <p></p>
                <p className="title button" onClick={e => this.printInfo()}>打印信息</p>
            </div>
        )
    }
}