import React from 'react';
import { toJS} from 'mobx'
import { observer } from 'mobx-react-lite'
import { useDrop } from 'react-dnd'
import Card from 'components/card'
import designComponentMap from 'design/design-component-map'
import { useStores } from 'store'
import './index.scss';

const PartCpm = ()=>{
  return <div className="sys-placeholder">添加至此处</div>
}

const PageContainer:React.FC = ()=>{
  const { applicationContext:{designList} } = useStores()
  const sourceDesignList = toJS(designList)
  // 让容器成为放置目标源
  const [, drop ] = useDrop({
    accept: 'Card'
  });

  function renderCop(item:any){
    const Component:any = designComponentMap[item.belong]
    return item.belong !==-1 ? <Component /> : <PartCpm />
  }

  return (
    <div ref={ drop } className="sys-page-container">
        {
          sourceDesignList.map((item,idx)=>{
            return <Card key={idx} >{renderCop(item)}</Card>
          })
        }
    </div>
  );
}

export default observer(PageContainer)