import React, { useMemo, useState } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';
import Layout from '../components/Layout';
import RiskFormModal from '../components/RiskFormModal';
import RiskTable, { RiskItem } from '../components/RiskTable';

const initialData: RiskItem[] = [
  {
    id: 1,
    type: '风险',
    level: '高',
    description: '关键接口由第三方提供，交付计划存在不确定性。',
    owner: '李四',
    closeDate: '2026-03-15',
    status: '处理中',
    attachments: '接口对接方案v1.0.docx / 1',
    source: 'flow'
  },
  {
    id: 2,
    type: '问题',
    level: '中',
    description: '用户侧关键业务流程需求多次变更，测试用例需要同步调整。',
    owner: '赵六',
    closeDate: '2026-05-01',
    status: '待处理',
    attachments: '需求变更记录表.xlsx / 1',
    source: 'flow'
  },
  {
    id: 3,
    type: '问题',
    level: '低',
    description: '部分现场环境网络不稳定，远程运维效率受影响。',
    owner: '现场负责人',
    closeDate: '2026-08-10',
    status: '已关闭',
    attachments: '现场网络优化方案.pdf / 1',
    source: 'flow'
  },
  {
    id: 4,
    type: '风险',
    level: '中',
    description: '关键报表需跨系统汇总，接口稳定性待验证。',
    owner: '王琪',
    closeDate: '2026-02-20',
    status: '处理中',
    attachments: '报表接口清单.xlsx / 3',
    source: 'flow'
  },
  {
    id: 5,
    type: '问题',
    level: '高',
    description: '客户现场机房资源不足，需紧急扩容以保障部署。',
    owner: '陈工',
    closeDate: '2026-01-18',
    status: '待处理',
    attachments: '扩容评估报告.pdf / 2',
    source: 'flow'
  },
  {
    id: 6,
    type: '风险',
    level: '低',
    description: '部分新模块培训尚未完成，可能影响后续验收节奏。',
    owner: '培训经理',
    closeDate: '2026-04-02',
    status: '处理中',
    attachments: '培训计划.xlsx / 1',
    source: 'flow'
  },
  {
    id: 7,
    type: '问题',
    level: '中',
    description: '移动端适配测试覆盖不足，需要补充场景回归。',
    owner: '质量负责人',
    closeDate: '2026-04-25',
    status: '处理中',
    attachments: '适配测试清单.docx / 2',
    source: 'flow'
  },
  {
    id: 8,
    type: '风险',
    level: '高',
    description: '第三方安全测评排期可能延迟，影响上线窗口。',
    owner: '宋敏',
    closeDate: '2026-03-30',
    status: '待处理',
    attachments: '安全测评排期说明.pdf / 1',
    source: 'flow'
  },
  {
    id: 9,
    type: '问题',
    level: '低',
    description: '部分历史数据存在缺失，需补录以保障报表准确性。',
    owner: '数据专员',
    closeDate: '2026-06-12',
    status: '处理中',
    attachments: '数据补录清单.xlsx / 4',
    source: 'flow'
  },
  {
    id: 10,
    type: '风险',
    level: '中',
    description: '跨部门评审资源未完全确认，可能影响关键节点推进。',
    owner: '项目助理',
    closeDate: '2026-02-10',
    status: '待处理',
    attachments: '评审安排计划.docx / 1',
    source: 'flow'
  }
];

const defaultFilters = {
  keyword: '',
  type: '全部',
  level: '全部',
  status: '全部',
  owner: ''
};

const ProjectDetailRisk = () => {
  const [items, setItems] = useState<RiskItem[]>(initialData);
  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<RiskItem | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const keywordMatch = appliedFilters.keyword
        ? item.description.includes(appliedFilters.keyword)
        : true;
      const typeMatch = appliedFilters.type === '全部' || item.type === appliedFilters.type;
      const levelMatch = appliedFilters.level === '全部' || item.level === appliedFilters.level;
      const statusMatch = appliedFilters.status === '全部' || item.status === appliedFilters.status;
      const ownerMatch = appliedFilters.owner ? item.owner.includes(appliedFilters.owner) : true;
      return keywordMatch && typeMatch && levelMatch && statusMatch && ownerMatch;
    });
  }, [items, appliedFilters]);

  const summaryText = useMemo(() => {
    const total = items.length;
    const highCount = items.filter((item) => item.level === '高').length;
    const processingCount = items.filter((item) => item.status === '处理中').length;
    const closedCount = items.filter((item) => item.status === '已关闭').length;
    return `当前登记问题与风险 ${total} 条，其中高风险 ${highCount} 条、处理中 ${processingCount} 条、已关闭 ${closedCount} 条。`;
  }, [items]);

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuery = () => {
    setAppliedFilters(filters);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const handleSave = (data: Omit<RiskItem, 'id' | 'source'>) => {
    const nextId = Math.max(0, ...items.map((item) => item.id)) + 1;
    const newItem: RiskItem = {
      id: nextId,
      source: 'manual',
      ...data
    };
    setItems((prev) => [newItem, ...prev]);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!pendingDelete) return;
    setItems((prev) => prev.filter((item) => item.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  const exportCsv = () => {
    const headers = ['序号', '类型', '等级/严重度', '描述', '责任人', '计划关闭时间', '状态', '附件'];
    const rows = filteredItems.map((item, index) => [
      String(index + 1),
      item.type,
      item.level,
      item.description,
      item.owner,
      item.closeDate,
      item.status,
      item.attachments
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([`\ufeff${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '项目风险问题清单.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">项目详情</div>
            <div className="card-sub">
              示例：从项目列表进入本页面，查看项目基础信息及风险问题清单。
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="tab-nav">
            <button className="disabled">基本信息</button>
            <button className="disabled">工时统计</button>
            <button className="disabled">工时明细</button>
            <button className="active">项目风险问题清单</button>
          </div>

          <div className="grid">
            <div className="field col-3">
              <label>项目名称</label>
              <input readOnly value="（示例）南网数字平台2024-2025年电网管理平台资产域项目" />
            </div>
            <div className="field col-3">
              <label>项目编号</label>
              <input readOnly className="mono" value="HT-2025-001" />
            </div>
            <div className="field col-3">
              <label>项目经理</label>
              <input readOnly value="鹿双丰" />
            </div>
            <div className="field col-3">
              <label>整体风险等级</label>
              <input readOnly value="中（示意）" />
            </div>
          </div>

          <div className="field col-12" style={{ marginTop: 4 }}>
            <label>风险/问题统计概览</label>
            <input readOnly value={summaryText} />
          </div>

          <div className="filter-bar">
            <div className="filter-group">
              <div className="field" style={{ minWidth: 160 }}>
                <label>关键字</label>
                <input
                  name="keyword"
                  placeholder="按描述搜索问题/风险"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="field" style={{ minWidth: 140 }}>
                <label>类型</label>
                <select name="type" value={filters.type} onChange={handleFilterChange}>
                  <option value="全部">全部</option>
                  <option value="问题">问题</option>
                  <option value="风险">风险</option>
                </select>
              </div>
              <div className="field" style={{ minWidth: 140 }}>
                <label>等级/严重度</label>
                <select name="level" value={filters.level} onChange={handleFilterChange}>
                  <option value="全部">全部</option>
                  <option value="高">高</option>
                  <option value="中">中</option>
                  <option value="低">低</option>
                </select>
              </div>
              <div className="field" style={{ minWidth: 140 }}>
                <label>状态</label>
                <select name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="全部">全部</option>
                  <option value="待处理">待处理</option>
                  <option value="处理中">处理中</option>
                  <option value="已关闭">已关闭</option>
                </select>
              </div>
              <div className="field" style={{ minWidth: 160 }}>
                <label>责任人</label>
                <input
                  name="owner"
                  placeholder="按责任人筛选"
                  value={filters.owner}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="actions">
              <button className="btn-secondary" onClick={handleReset}>
                重置
              </button>
              <button className="btn" onClick={handleQuery}>
                查询
              </button>
              <button className="btn-success" onClick={exportCsv}>
                导出清单
              </button>
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <RiskTable data={filteredItems} onDelete={setPendingDelete} />
          </div>

          <div style={{ height: 10 }} />
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            + 新增问题/风险
          </button>
        </div>
      </div>

      <RiskFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="确认删除当前记录"
        description={pendingDelete?.description ?? ''}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </Layout>
  );
};

export default ProjectDetailRisk;
