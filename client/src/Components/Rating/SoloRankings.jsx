import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'reactstrap';
import { getSoloRanks } from '../../Redux/Actions/rankAction';

function SoloRankings() {
  const dispatch = useDispatch();
  const { soloRank } = useSelector((state) => state);
  useEffect(() => {
    if (!soloRank.length) {
      dispatch(getSoloRanks());
    }
  }, []);
  return (
    <div>
      Solo Rankings
      <Table dark bordered style={{ width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>
            <th style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>Name</th>
            <th style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>Rank</th>
            <th style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>Won</th>
            <th style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>Lost</th>
          </tr>
        </thead>
        <tbody>
          {soloRank.map((el) => {
            if ((el.solowon + el.sololost) > 4 && !el.ban) {
              return (
                <tr key={el.id} style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>
                  <td style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>{el.nickName}</td>
                  <td style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>{el.solorank}</td>
                  <td style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>{el.solowon}</td>
                  <td style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>{el.sololost}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default SoloRankings;
