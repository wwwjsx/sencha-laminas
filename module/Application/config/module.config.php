<?php

declare(strict_types=1);

namespace Application;

use Laminas\Router\Http\Literal;
use Laminas\ServiceManager\Factory\InvokableFactory;
use Laminas\Mvc\Controller\LazyControllerAbstractFactory;

return [
    'asset_manager' => [
        'resolver_configs' => [
            'paths' => [
                'css' => 'public/css',
                'js' => 'public/js',
                'img' => 'public/img',
                'sencha' => 'public/sencha',
            ]
        ]
    ],
    'router' => [
        'routes' => [
            'home' => [
                'type'    => Literal::class,
                'options' => [
                    'route'    => '/',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
            'location' => [
                'type'    => Literal::class,
                'options' => [
                    'route'    => '/locations',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'locations',
                    ],
                ]
            ],
            'user' => [
                'type'    => Literal::class,
                'options' => [
                    'route'    => '/users',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'users',
                    ],
                ]
            ],
            'users-update' => [
                'type' => Literal::class,
                'options' => [
                    'route' => '/users/update',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action' => 'users-update'
                    ]
                ]
            ],
            'degree' => [
                'type'    => Literal::class,
                'options' => [
                    'route'    => '/degrees',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'degrees'
                    ],
                ]
            ],
        ],
    ],
    'controllers' => [
        'factories' => [
            Controller\IndexController::class => LazyControllerAbstractFactory::class
        ],
    ],
    'view_manager' => [
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => [
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'application/index/index' => __DIR__ . '/../view/application/index/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
];
