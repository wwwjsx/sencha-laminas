<?php
declare(strict_types=1);

namespace Application\Model;

use Laminas\Db\TableGateway\AbstractTableGateway;
use Laminas\Db\Adapter\Adapter;

class Degree extends AbstractTableGateway {

    protected $adapter;
    protected $table = 'degrees';

    public function __construct(Adapter $adapter) {
        $this->adapter = $adapter;
        $this->initialize();
    }
}