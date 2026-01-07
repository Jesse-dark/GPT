import React from 'react';

export type RiskSource = 'flow' | 'manual';

export interface RiskItem {
  id: number;
  type: '问题' | '风险';
  level: '高' | '中' | '低';
  description: string;
  owner: string;
  closeDate: string;
  status: '待处理' | '处理中' | '已关闭';
  attachments: string;
  source: RiskSource;
}

interface RiskTableProps {
  data: RiskItem[];
  onDelete: (item: RiskItem) => void;
}

const levelTagClass = (level: RiskItem['level']) => {
  if (level === '高') return 'tag rejected';
  if (level === '中') return 'tag warning';
  return 'tag low';
};

const statusTagClass = (status: RiskItem['status']) => {
  if (status === '已关闭') return 'tag archived';
  if (status === '处理中') return 'tag warning';
  return 'tag approving';
};

const RiskTable = ({ data, onDelete }: RiskTableProps) => {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th style={{ width: 50 }}>序号</th>
            <th style={{ width: 90 }}>类型</th>
            <th style={{ width: 110 }}>等级/严重度</th>
            <th>描述</th>
            <th style={{ width: 110 }}>责任人</th>
            <th style={{ width: 140 }}>计划关闭时间</th>
            <th style={{ width: 100 }}>状态</th>
            <th style={{ width: 170 }}>附件（文件名/数量）</th>
            <th style={{ width: 90 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="mono">{index + 1}</td>
              <td>{item.type}</td>
              <td>
                <span className={levelTagClass(item.level)}>{item.level}</span>
              </td>
              <td>{item.description}</td>
              <td>{item.owner}</td>
              <td>{item.closeDate}</td>
              <td>
                <span className={statusTagClass(item.status)}>{item.status}</span>
              </td>
              <td>{item.attachments}</td>
              <td>
                {item.source === 'flow' ? (
                  <span className="muted">同步自启动流程</span>
                ) : (
                  <button className="btn-link" onClick={() => onDelete(item)}>
                    删除
                  </button>
                )}
              </td>
            </tr>
          ))}
          {!data.length && (
            <tr>
              <td colSpan={9} className="muted">
                暂无匹配数据，请调整筛选条件。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RiskTable;
