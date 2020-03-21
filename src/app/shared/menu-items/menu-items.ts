import {Injectable} from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}

export interface ChildrenItems {
    state: string;
    target?: boolean;
    name: string;
    type?: string;
    children?: ChildrenItems[];
}

export interface MainMenuItems {
    state: string;
    main_state?: string;
    target?: boolean;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    children?: ChildrenItems[];
}

export interface Menu {
    label: string;
    main: MainMenuItems[];
}

const MENUITEMS = [
    {
        label: 'Navigation',
        main: [
            {
                state: 'dashboard',
                name: 'Dashboard',
                type: 'link',
                icon: 'ti-home'
            },
            {
                state: 'widget',
                name: 'Widget',
                type: 'link',
                icon: 'ti-view-grid',
                badge: [
                    {
                        type: 'danger',
                        value: '100+'
                    }
                ]
            }
        ],
    },
    {
        label: 'UI Element',
        main: [
            {
                state: 'basic',
                name: 'Basic Components',
                type: 'sub',
                icon: 'ti-layout-grid2-alt',
                children: [
                    {
                        state: 'alert',
                        name: 'Alert'
                    },
                    {
                        state: 'breadcrumb',
                        name: 'Breadcrumbs'
                    },
                    {
                        state: 'button',
                        name: 'Button'
                    },
                    {
                        state: 'accordion',
                        name: 'Accordion'
                    },
                    {
                        state: 'generic-class',
                        name: 'Generic Class'
                    },
                    {
                        state: 'tabs',
                        name: 'Tabs'
                    },
                    {
                        state: 'label-badge',
                        name: 'Label Badge'
                    },
                    {
                        state: 'typography',
                        name: 'Typography'
                    },
                    {
                        state: 'other',
                        name: 'Other'
                    },
                ]
            },
            {
                state: 'advance',
                name: 'Advance Components',
                type: 'sub',
                icon: 'ti-crown',
                children: [
                    {
                        state: 'modal',
                        name: 'Modal'
                    },
                    {
                        state: 'notifications',
                        name: 'Notifications'
                    },
                    {
                        state: 'notify',
                        name: 'PNOTIFY',
                        badge: [
                            {
                                type: 'info',
                                value: 'New'
                            }
                        ]
                    },
                ]
            },
            {
                state: 'animations',
                name: 'Animations',
                type: 'link',
                icon: 'ti-reload rotate-refresh'
            }
        ]
    },
    {
        label: 'Forms',
        main: [
            {
                state: 'forms',
                name: 'Form Components',
                type: 'sub',
                icon: 'ti-layers',
                children: [
                    {
                        state: 'basic-elements',
                        name: 'Form Components'
                    }, {
                        state: 'add-on',
                        name: 'Form-Elements-Add-On'
                    }, {
                        state: 'advance-elements',
                        name: 'Form-Elements-Advance'
                    }, {
                        state: 'form-validation',
                        name: 'Form Validation'
                    }
                ]
            }, {
                state: 'picker',
                main_state: 'forms',
                name: 'Form Picker',
                type: 'link',
                icon: 'ti-pencil-alt',
                badge: [
                    {
                        type: 'warning',
                        value: 'New'
                    }
                ]
            }, {
                state: 'select',
                main_state: 'forms',
                name: 'Form Select',
                type: 'link',
                icon: 'ti-shortcode'
            }, {
                state: 'masking',
                main_state: 'forms',
                name: 'Form Masking',
                type: 'link',
                icon: 'ti-write'
            }
        ]
    },
    {
        label: 'Tables',
        main: [
            {
                state: 'bootstrap-table',
                name: 'Bootstrap Table',
                type: 'sub',
                icon: 'ti-receipt',
                children: [
                    {
                        state: 'basic',
                        name: 'Basic Table'
                    }, {
                        state: 'sizing',
                        name: 'Sizing Table'
                    }, {
                        state: 'border',
                        name: 'Border Table'
                    }, {
                        state: 'styling',
                        name: 'Styling Table'
                    }
                ]
            },
            {
                state: 'data-table',
                name: 'Data Table',
                type: 'sub',
                icon: 'ti-widgetized',
                children: [
                    {
                        state: 'basic',
                        name: 'Basic Table'
                    }, {
                        state: 'editable',
                        name: 'Editable'
                    }, {
                        state: 'row-details',
                        name: 'Row Details Table'
                    }, {
                        state: 'paging',
                        name: 'Paging Table'
                    }, {
                        state: 'selection',
                        name: 'Selection Table'
                    }, {
                        state: 'other',
                        name: 'Other Table'
                    }
                ]
            }
        ]
    },
    {
        label: 'Chart And Map',
        main: [
            {
                state: 'charts',
                name: 'Charts',
                type: 'sub',
                icon: 'ti-bar-chart-alt',
                children: [
                    {
                        state: 'google',
                        name: 'Google'
                    }, {
                        state: 'echart',
                        name: 'E-Chart'
                    }, {
                        state: 'chart-js',
                        name: 'ChartJS'
                    }, {
                        state: 'list-chart',
                        name: 'Chartist'
                    }, {
                        state: 'knob',
                        name: 'Knob'
                    }, {
                        state: 'morris-js',
                        name: 'MorrisJS'
                    }, {
                        state: 'nvd3',
                        name: 'NVD3'
                    }, {
                        state: 'peity',
                        name: 'Peity'
                    }, {
                        state: 'radial',
                        name: 'Radial'
                    }, {
                        state: 'sparklines',
                        name: 'Sparklines'
                    }, {
                        state: 'c3-js',
                        name: 'C3 JS'
                    }
                ]
            },
            {
                state: 'map',
                name: 'Maps',
                type: 'sub',
                icon: 'ti-map-alt',
                children: [
                    {
                        state: 'google',
                        name: 'Google'
                    }, {
                        state: 'vector',
                        name: 'Vector'
                    }
                ]
            },
            {
                state: 'landing',
                external: 'http://html.codedthemes.com/mash-able/dark/landingpage/index.html',
                name: 'Landing Page',
                type: 'external',
                icon: 'ti-mobile',
                target: true
            }
        ]
    },
    {
        label: 'Pages',
        main: [
            {
                state: 'authentication',
                name: 'Authentication',
                type: 'sub',
                icon: 'ti-id-badge',
                children: [
                    {
                        state: 'login',
                        type: 'sub',
                        name: 'Login Pages',
                        children: [
                            {
                                state: 'with-bg-image',
                                name: 'With BG Image',
                                target: true
                            }, {
                                state: 'with-header-footer',
                                name: 'With Header Footer',
                                target: true
                            }, {
                                state: 'with-social',
                                name: 'With Social Icon',
                                target: true
                            }, {
                                state: 'with-social-header-footer',
                                name: 'Social With Header Footer',
                                target: true
                            }
                        ]
                    }, {
                        state: 'registration',
                        type: 'sub',
                        name: 'Registration Pages',
                        children: [
                            {
                                state: 'with-bg-image',
                                name: 'With BG Image',
                                target: true
                            }, {
                                state: 'with-header-footer',
                                name: 'With Header Footer',
                                target: true
                            }, {
                                state: 'with-social',
                                name: 'With Social Icon',
                                target: true
                            }, {
                                state: 'with-social-header-footer',
                                name: 'Social With Header Footer',
                                target: true
                            }, {
                                state: 'multi-step',
                                name: 'Multi Step',
                                target: true
                            }
                        ]
                    },
                    {
                        state: 'forgot',
                        name: 'Forgot Password',
                        target: true
                    },
                    {
                        state: 'lock-screen',
                        name: 'Lock Screen',
                        target: true
                    },
                ]
            }, {
                state: 'maintenance',
                name: 'Maintenance',
                type: 'sub',
                icon: 'ti-settings',
                children: [
                    {
                        state: 'error',
                        name: 'Error'
                    },
                    {
                        state: 'coming-soon',
                        name: 'Coming Soon'
                    },
                    {
                        state: 'offline-ui',
                        name: 'Offline UI',
                        target: true
                    }
                ]
            }, {
                state: 'user',
                name: 'User Profile',
                type: 'sub',
                icon: 'ti-user',
                children: [
                    {
                        state: 'profile',
                        name: 'User Profile'
                    }, {
                        state: 'card',
                        name: 'User Card'
                    }
                ]
            }
        ]
    },
    {
        label: 'App',
        main: [
            {
                state: 'crm-contact',
                name: 'CRM Contact',
                type: 'link',
                icon: 'ti-layout-list-thumb'
            }, {
                state: 'task',
                name: 'Task',
                type: 'sub',
                icon: 'ti-check-box',
                children: [
                    {
                        state: 'list',
                        name: 'Task List'
                    }, {
                        state: 'board',
                        name: 'Task Board'
                    }, {
                        state: 'details',
                        name: 'Task Details'
                    }, {
                        state: 'issue',
                        name: 'Issue List'
                    }
                ]
            }
        ]
    },
    {
        label: 'Extension',
        main: [
            {
                state: 'editor',
                name: 'Editor',
                type: 'sub',
                icon: 'ti-pencil-alt',
                children: [
                    {
                        state: 'froala-edit',
                        name: 'Froala WYSIWYG'
                    }, {
                        state: 'quill-edit',
                        name: 'Quill'
                    }
                ]
            }, {
                state: 'invoice',
                name: 'Invoice',
                type: 'sub',
                icon: 'ti-layout-media-right',
                children: [
                    {
                        state: 'basic',
                        name: 'Invoice'
                    }, {
                        state: 'summary',
                        name: 'Invoice Summary'
                    }, {
                        state: 'list',
                        name: 'Invoice List'
                    }
                ]
            }, {
                state: 'file-upload',
                name: 'File Upload',
                type: 'link',
                icon: 'ti-cloud-up'
            }, {
                state: 'change-log',
                name: 'Change Log',
                type: 'link',
                icon: 'ti-list',
                badge: [
                    {
                        type: 'warning',
                        value: '1.0'
                    }
                ]
            }
        ]
    },
    {
        label: 'Other',
        main: [
            {
                state: '',
                name: 'Menu Levels',
                type: 'sub',
                icon: 'ti-direction-alt',
                children: [
                    {
                        state: '',
                        name: 'Menu Level 2.1',
                        target: true
                    }, {
                        state: '',
                        name: 'Menu Level 2.2',
                        type: 'sub',
                        children: [
                            {
                                state: '',
                                name: 'Menu Level 2.2.1',
                                target: true
                            },
                            {
                                state: '',
                                name: 'Menu Level 2.2.2',
                                target: true
                            }
                        ]
                    }, {
                        state: '',
                        name: 'Menu Level 2.3',
                        target: true
                    }, {
                        state: '',
                        name: 'Menu Level 2.4',
                        type: 'sub',
                        children: [
                            {
                                state: '',
                                name: 'Menu Level 2.4.1',
                                target: true
                            },
                            {
                                state: '',
                                name: 'Menu Level 2.4.2',
                                target: true
                            }
                        ]
                    }
                ]
            }, {
                state: 'simple-page',
                name: 'Simple Page',
                type: 'link',
                icon: 'ti-layout-sidebar-left'
            }
        ]
    }, {
        label: 'Support',
        main: [
            {
                state: 'documentation',
                name: 'Documentation',
                external: 'http://html.codedthemes.com/mash-able/doc/',
                type: 'external',
                icon: 'ti-file',
                target: true
            }, {
                state: 'submit-issue',
                external: 'https://codedthemes.com/submit-ticket/',
                name: 'Submit Issue',
                type: 'external',
                icon: 'ti-layout-list-post',
                target: true
            }
        ]
    }
];

@Injectable()
export class MenuItems {
    getAll(): Menu[] {
        return MENUITEMS;
    }

    /*add(menu: Menu) {
      MENUITEMS.push(menu);
    }*/
}
