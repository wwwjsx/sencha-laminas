<?php
declare(strict_types=1);

namespace Application\Model;

use Laminas\Db\TableGateway\AbstractTableGateway;
use Laminas\Db\Adapter\Adapter;
use Laminas\Db\Sql\Select;
use Laminas\Db\Sql\Expression;

class User extends AbstractTableGateway {

    protected $adapter;
    protected $table = 'users';

    public function __construct(Adapter $adapter) {
        $this->adapter = $adapter;
        $this->initialize();
    }

    public function getAll() {
        $select = new Select();
        $select->from(['u' => 'users']);
        $select->join(
            ['d' => 'degrees'],
            'd.id = u.degree_id',
            ['degree_name' => 'name'],
            Select::JOIN_LEFT
        );
        $select->join(
            ['ul' => 'users_locations'],
            'ul.user_id = u.id',
            [],
            Select::JOIN_LEFT
        );
        $select->join(
            ['l' => 'locations'],
            'l.id = ul.location_id',
            [
                'locations' => new Expression('GROUP_CONCAT(l.name, ";")'),
                'locations_id' => new Expression('GROUP_CONCAT(l.id, ";")')
            ],
            Select::JOIN_LEFT
        );
        $select->group('ul.user_id');

        $resultSet = $this->selectWith($select);
        $result = $resultSet->toArray();

        // convert locations and locations_id to array
        foreach($result as $index => $value) {
            $locations = $value['locations'];
            $locationsIds = $value['locations_id'];

            if (!empty($locations)) {
                $locations = explode(';', $locations);
                $locationsIds = array_map('intval', explode(';', $locationsIds));
                $res = [];

                foreach($locations as $k => $v) {
                    $res[$locationsIds[$k]] = $locations[$k];
                }
                $result[$index]['locations_id'] = $locationsIds;
                $result[$index]['locations'] = $res;
            }
        }

        return $result;
    }
}