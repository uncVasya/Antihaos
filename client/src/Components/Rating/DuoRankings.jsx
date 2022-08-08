import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'reactstrap';
import { getDuoRanks } from '../../Redux/Actions/rankAction';

function DuoRankings() {
  const dispatch = useDispatch();
  const { duoRank } = useSelector((state) => state);
  useEffect(() => {
    if (!duoRank.length) {
      dispatch(getDuoRanks());
    }
  }, []);
  return (
    <div>
      Duo Rankings
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
          {duoRank.map((el) => {
            if ((el.duowon + el.duolost) > 4 && !el.ban) {
              return (
                <tr key={el.id} style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>
                  <td style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>{el.nickName}</td>
                  <td style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>{el.duorank}</td>
                  <td style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>{el.duowon}</td>
                  <td style={{ backgroundColor: '#003686', borderColor: '#FFF' }}>{el.duolost}</td>
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

export default DuoRankings;
