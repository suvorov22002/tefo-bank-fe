import {
  Collapse as AntdCollapse,
  CollapsePanelProps as AntdCollapsePanelProps,
  CollapseProps as AntdCollapseProps,
} from 'antd'

export interface CollapseProps {
  accordion?: AntdCollapseProps['accordion']
  activeKey?: AntdCollapseProps['activeKey']
  bordered?: AntdCollapseProps['bordered']
  children?: AntdCollapseProps['children']
  className?: AntdCollapseProps['className']
  collapsible?: AntdCollapseProps['collapsible']
  defaultActiveKey?: AntdCollapseProps['defaultActiveKey']
  destroyInactivePanel?: AntdCollapseProps['destroyInactivePanel']
  expandIconPosition?: AntdCollapseProps['expandIconPosition']
  ghost?: AntdCollapseProps['ghost']
  size?: AntdCollapseProps['size']
  expandIcon?: AntdCollapseProps['expandIcon']
  onChange?: AntdCollapseProps['onChange']
}

export interface CollapsePanelProps {
  key: AntdCollapsePanelProps['key']
  header: AntdCollapsePanelProps['header']
  className?: AntdCollapsePanelProps['className']
  style?: AntdCollapsePanelProps['style']
  showArrow?: AntdCollapsePanelProps['showArrow']
  prefixCls?: AntdCollapsePanelProps['prefixCls']
  forceRender?: AntdCollapsePanelProps['forceRender']
  id?: AntdCollapsePanelProps['id']
  extra?: AntdCollapsePanelProps['extra']
  collapsible?: AntdCollapsePanelProps['collapsible']
  children?: AntdCollapsePanelProps['children']
}

const { Panel: AntdPanel } = AntdCollapse

export const Panel = AntdPanel

export const Collapse = (props: CollapseProps) => <AntdCollapse {...props} />
