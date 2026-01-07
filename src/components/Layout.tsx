import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo" />
          <div>
            <h1>MOM 一体化系统（原型）</h1>
            <div className="muted" style={{ fontSize: 12 }}>
              流程中心 · 项目管理
            </div>
          </div>
        </div>

        <details className="nav-acc" open>
          <summary>流程中心</summary>
          <nav className="nav">
            <a className="active" href="/">
              <span className="dot" /> 新建流程
            </a>
            <a href="/">
              <span className="dot" /> 我的请求
            </a>
            <a href="/">
              <span className="dot" /> 待办任务
            </a>
            <a href="/">
              <span className="dot" /> 已办任务
            </a>
            <a href="/">
              <span className="dot" /> 历史任务
            </a>
          </nav>
        </details>

        <details className="nav-acc" open>
          <summary>项目管理</summary>
          <nav className="nav">
            <a href="/">
              <span className="dot" /> 项目列表
            </a>
            <a href="/">
              <span className="dot" /> 项目执行情况报告
            </a>
            <a href="/">
              <span className="dot" /> 采购计划
            </a>
          </nav>
        </details>

        <div style={{ marginTop: 'auto', padding: '10px 10px' }}>
          <div className="footer-note">
            说明：此为线框级原型复刻页面，用于对齐页面结构与字段。
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="crumbs">项目管理 / 项目详情 / 项目风险问题清单</div>
          <div className="right">
            <span className="pill">
              当前角色：<b>项目经理</b>
            </span>
            <select className="pill" defaultValue="pm">
              <option value="pm">项目经理</option>
              <option value="techpm">技术/产品经理</option>
              <option value="dept_pmo">部门PMO专员</option>
              <option value="dept_head">部门负责人</option>
              <option value="sales">销售/销售负责人</option>
              <option value="finance">财务负责人/财务</option>
              <option value="purchase">采购负责人/采购</option>
              <option value="ops">项目运营负责人</option>
              <option value="gm">总经理</option>
            </select>
          </div>
        </header>

        <section className="content">{children}</section>
      </main>
    </div>
  );
};

export default Layout;
