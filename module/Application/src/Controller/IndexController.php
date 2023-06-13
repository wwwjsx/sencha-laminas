<?php

declare(strict_types=1);

namespace Application\Controller;

use Application\Model;
use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\View\Model\ViewModel;
use Laminas\ServiceManager\ServiceManager;
use Psr\Container\ContainerInterface;
use Laminas\Config\Config;
use Laminas\Db\Adapter\Adapter;
use Laminas\View\Model\JsonModel;

class IndexController extends AbstractActionController
{
    private $serviceManager;
    private $dbAdapter;

    public function __construct(ServiceManager $sm) {
        $this->dbAdapter = $sm->get(Adapter::class);
        $this->serviceManager = $sm;
    }

    /**
     * Load Sencha application
     */
    public function indexAction()
    {
        $appConfig = $this->serviceManager->get('ApplicationConfig');
        $viewModel = new ViewModel();

        $viewModel->setVariable('production', $appConfig['production']);

        return $viewModel;
    }

    /**
     * Load all locations
     * return {JSON}
     */
    public function locationsAction() {
        $model = new Model\Location($this->dbAdapter);
        $select = $model->select();
        $result = $select->toArray();

        $viewModel = new JsonModel($result);

        return $viewModel;
    }

    /**
     * Load all users with additional data
     * return {JSON}
     */
    public function usersAction() {
        $model = new Model\User($this->dbAdapter);

        $viewModel = new JsonModel($model->getAll());

        return $viewModel;
    }

    /**
     * Load all degrees
     * @return {JSON}
     */
    public function degreesAction() {
        $model = new Model\Degree($this->dbAdapter);
        $select = $model->select();
        $result = $select->toArray();

        return new JsonModel($result);
    }

    /**
     * Users update action
     * @return {JSON}
     */
    public function usersUpdateAction() {
        $model = new Model\User($this->dbAdapter);
        $request = $this->getRequest();

        if (!$request->isPut()) {
            return new JsonModel([
                'success' => false,
                'message' => 'Incorrect request method type'
            ]);
        }

        $content = $request->getContent();
        $params = json_decode($content, true);

        if (!(is_array($params) && count($params)>0)) {
            return new JsonModel([
                'success' => false,
                'message' => 'Incorrect params'
            ]);
        }

        $id = (int) $params['id'];
        $degreeId = (int) $params['degree_id'];

        try {
            $model->update(['degree_id' => $degreeId], ['id' => $id]);
        } catch (e) {
            return new JsonModel([
                'success' => false,
                'message' => 'Can not update user degree'
            ]);
        }

        return new JsonModel([
            'success' => true
        ]);
    }
}
