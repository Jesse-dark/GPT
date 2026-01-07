import React, { useEffect, useState } from 'react';
import type { RiskItem } from './RiskTable';

interface RiskFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Omit<RiskItem, 'id' | 'source'>) => void;
}

const defaultForm: Omit<RiskItem, 'id' | 'source'> = {
  type: '问题',
  level: '中',
  description: '',
  owner: '',
  closeDate: '',
  status: '待处理',
  attachments: ''
};

const RiskFormModal = ({ open, onClose, onSave }: RiskFormModalProps) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (open) {
      setForm(defaultForm);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="card-title">新增问题/风险</div>
            <div className="card-sub">与“项目启动流程”字段保持一致。</div>
          </div>
          <button className="btn-secondary" onClick={onClose}>
            关闭
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="grid">
              <div className="field col-4">
                <label>类型</label>
                <select name="type" value={form.type} onChange={handleChange}>
                  <option value="问题">问题</option>
                  <option value="风险">风险</option>
                </select>
              </div>
              <div className="field col-4">
                <label>等级/严重度</label>
                <select name="level" value={form.level} onChange={handleChange}>
                  <option value="高">高</option>
                  <option value="中">中</option>
                  <option value="低">低</option>
                </select>
              </div>
              <div className="field col-4">
                <label>状态</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="待处理">待处理</option>
                  <option value="处理中">处理中</option>
                  <option value="已关闭">已关闭</option>
                </select>
              </div>
              <div className="field col-12">
                <label>描述</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="请输入问题/风险描述"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field col-4">
                <label>责任人</label>
                <input
                  name="owner"
                  placeholder="请输入责任人"
                  value={form.owner}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field col-4">
                <label>计划关闭时间</label>
                <input
                  name="closeDate"
                  type="date"
                  value={form.closeDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field col-4">
                <label>附件（文件名/数量）</label>
                <input
                  name="attachments"
                  placeholder="例如：问题清单汇总.pdf / 2"
                  value={form.attachments}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              取消
            </button>
            <button type="submit" className="btn">
              保存并返回
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RiskFormModal;
