import React from 'react'
import {Checkbox,Button} from 'antd'
import './index.css'
import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'
import { finishedPlansState, plansState } from '../../../../recoil'
import storage from '../../../../model/storage'

export default function Recovery() {

    const[finishedPlans,setfinishedPlans]=useRecoilState(finishedPlansState)
    const[plans,setPlans]=useRecoilState(plansState)
    const total=finishedPlans.length
    const notdoneCount=finishedPlans.reduce((pre,finishedPlan)=>{return pre+(finishedPlan.done?0:1)},0)

    const allCheck=(event)=>{
        const nfinishedPlans=finishedPlans.map((planObj)=>{
            return {...planObj,done:!event.target.checked}
        })
        setfinishedPlans(nfinishedPlans)
        storage.set('finishedPlans',nfinishedPlans);
    }

    const recoverChecked=()=>{
        //从finishedplans中删除所选项
        const nfinishedPlans=finishedPlans.filter((planObj)=>{
            if(planObj.done===true) return planObj
        })
        //加到plans中
        var nPlans=plans
        const nPlansArry=finishedPlans.filter((planObj)=>{
            if(planObj.done===false) return planObj
        })
        for(var i=0;i<nPlansArry.length;i++){
            nPlans=[nPlansArry[i],...nPlans]
        }
        setfinishedPlans(nfinishedPlans)
        storage.set('finishedPlans',nfinishedPlans);
        setPlans(nPlans)
        storage.set('planslist',nPlans);
    }

    return (
        <div>
            <span className='total_span'>共完成{total}项</span>
                <span className='btn_span'>
                    <Checkbox onChange={allCheck}
                                checked={notdoneCount===total?true:false}>全选/已选{notdoneCount}项</Checkbox>&nbsp;
                    <Link to="/plan">
                        <Button type="primary" onClick={recoverChecked}>恢复所选计划</Button>
                    </Link>
                </span>
        </div>
    )
}
