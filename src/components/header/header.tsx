import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TAB } from '@/context/appContext';
import { useAppActionsContext } from '@/hooks/useAppActionsContext';
import { useSlideContext } from '@/hooks/useSlideContext';
import { useAppContext } from '@/hooks/useAppContext';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import { NodeType } from '@/types';
import { exportToHtml } from '@/utils/htmlExport';

import * as s from './styled.module.scss';

export function Header() {
    const { activeTab } = useAppContext();
    const { setActiveTab } = useAppActionsContext();
    const { addNode } = useSlideContext();
    const { slides } = useSlideMediator();

    const fileMenuItems: MenuProps['items'] = [
        { key: 'new', label: 'Создать' },
        {
            key: 'open',
            label: 'Экспорт в HTML',
            onClick: () => exportToHtml(slides),
        },
        { key: 'save', label: 'Пригласить' },
    ];

    const insertionMenuItems: MenuProps['items'] = [
        { key: 'text', label: 'Текст', onClick: () => addNode(NodeType.TEXT) },
        { key: 'image', label: 'Изображение', onClick: () => addNode(NodeType.IMAGE) },
        { key: 'table', label: 'Таблица' },
        { key: 'figure', label: 'Фигура' },
    ];

    return (
        <nav className={s.root}>
            <ul className={s.tabs}>
                <Space>
                    <Dropdown
                        menu={{ items: fileMenuItems }}
                        placement="bottomLeft"
                        arrow={{ pointAtCenter: true }}
                    >
                        <Button type="text">
                            <Space>
                                {TAB.FILE}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>

                    <Dropdown
                        menu={{ items: insertionMenuItems }}
                        placement="bottomLeft"
                        arrow={{ pointAtCenter: true }}
                    >
                        <Button type="text">
                            <Space>
                                {TAB.INSERTION}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>

                    {Object.keys(TAB)
                        .slice(2)
                        .map((tab: keyof typeof TAB) => (
                            <Button
                                type={
                                    activeTab === TAB[tab] ? 'primary' : 'text'
                                }
                                onClick={() => setActiveTab(TAB[tab])}
                                key={tab}
                            >
                                {TAB[tab]}
                            </Button>
                        ))}
                </Space>
            </ul>
        </nav>
    );
}
